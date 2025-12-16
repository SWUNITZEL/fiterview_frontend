import { useMemo } from "react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/Footer";
import MainContainer from "../../components/MainContainer";
import LoadingScreen from "../../components/LoadingScreen";

import { useLearning } from "../../hooks/useLearning";

const Learning = () => {
  const navigate = useNavigate();

  const {
    chatList,
    curriculumList,
    loading,
  } = useLearning();

  const activeChat = useMemo(() => {
    if (!chatList.length) return null;

    return chatList.reduce((max, curr) => {
      if (
        curr.current_step > max.current_step ||
        (curr.current_step === max.current_step &&
          curr.current_id > max.current_id)
      ) {
        return curr;
      }
      return max;
    });
  }, [chatList]);

  const chatMap = useMemo(() => {
    const map = {};

    chatList.forEach((chat) => {
      const stepKey = `step${chat.current_step}`;
      const index = chat.current_id - 1;

      map[`${stepKey}-${index}`] = {
        chatId: chat.chat_id,
        active: 
          activeChat &&
          chat.chat_id === activeChat.chat_id,
        progress: chat.current_question_index
      };
    });

    return map;
  }, [chatList, activeChat]);

  const normalizeStep = (stepKey, stepValue) => {
    // step1: 단일 카드
    if (stepValue?.title) {
      const chatId = chatMap[`${stepKey}-0`];

      return {
        stepKey,
        title: stepValue.title,
        items: [
          {
            ...stepValue,
            chatId,
          },
        ],
      };
    }

    // step2 이상: 여러 카드
    
    return {
      stepKey,
      title: stepKey.toUpperCase(),
      items: Object.values(stepValue ?? {}).map((item, index) => {
        const chatInfo = chatMap[`${stepKey}-${index}`];

        return {
          ...item,
          chatId: chatInfo?.chatId,
          active: chatInfo?.active ?? false,
          progress: chatInfo?.progress ?? null,
        };
      }),
    };
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />
      {loading && <LoadingScreen />}
      <MainContainer sx={{ height: "70vh" }}>
        <Typography
          variant="h1"
          fontWeight={700}
          fontSize="28px"
          marginBottom="16px"
        >
          로드맵
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            columnGap: 3,
          }}
        >
          {Object.entries(curriculumList ?? {}).map(
            ([stepKey, stepValue]) => {
              const stepData = normalizeStep(stepKey, stepValue);

              return (
                <Box
                  key={stepKey}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* STEP 제목 */}
                  <Box
                    sx={{
                      backgroundColor: "var(--color-blue-500)",
                      color: "#ffffff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      height: "72px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      fontSize="18px"
                      lineHeight="28px"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxHeight: "56px",
                      }}
                    >
                      {stepData.title}
                    </Typography>
                  </Box>

                  {/* 카드 리스트 */}
                  {stepData.items.map((item, index) => {
                    const disabled = item.active ? false : true;

                    return (
                      <Card
                        key={index}
                        onClick={
                          item.chatId
                          ? () => navigate(`${item.progress===null?"reflection":"chat"}/${item.chatId}`)
                          : undefined
                        }
                        sx={{
                          boxShadow: "none",
                          cursor: disabled ? "default" : "pointer",
                          height: "116px",
                          borderRadius: 2,
                          backgroundColor: item.active ? "var(--color-gray-100)" : "var(--color-gray-050)",
                          ...(disabled
                            ? {}
                            : {
                                "&:hover": {
                                  backgroundColor: "var(--color-gray-200)",
                                  transition: "0.2s",
                                },
                              }),
                        }}
                      >
                        <CardContent
                          sx={{
                            p: 2,
                            "&:last-child": { pb: 2 },
                            cursor: item.active ? "pointer" : "default",
                            opacity: item.chatId && item.active ? 1 : 0.5,
                          }}
                        >
                          <Typography
                            fontWeight={700}
                            fontSize="18px"
                            color="var(--color-gray-900)"
                            lineHeight="28px"
                          >
                            {item.title}
                          </Typography>

                          {item.chatId && (
                            <Typography
                              fontSize="16px"
                              color="var(--color-blue-500)"
                              lineHeight="24px"
                              mb="4px"
                            >
                              {item.active? (item.progress===null? "50" : item.progress*16.6) : "100"}% 완료
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              fontSize="18px"
                              lineHeight="28px"
                              color={
                                disabled
                                  ? "var(--color-gray-400)"
                                  : "var(--color-gray-700)"
                              }
                            >
                              {item.action}
                            </Typography>

                            {!disabled && (
                              <Box
                                component="img"
                                src={`${process.env.PUBLIC_URL}/images/icons/icon-arrow-right.svg`}
                                alt=""
                                sx={{ width: 20, height: 20 }}
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              );
            }
          )}
      </Box>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Learning;

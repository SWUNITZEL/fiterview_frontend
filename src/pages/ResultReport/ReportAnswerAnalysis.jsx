import React from "react"
import {Grid} from "@mui/material"


const ReportAnswerAnalysis = () => {

  return (
    <div className="report-container">
      <Grid container spacing={3} justifyContent="center" alignItems="center" width={"710px"}>
        <Grid item xs={6}>
          <div className="neumorphic-box">
            <h1>동영상</h1>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="neumorphic-box">
            <span>평가들</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="neumorphic-box">
            <p>

            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default ReportAnswerAnalysis

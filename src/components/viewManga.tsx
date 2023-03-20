import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import MangaApis from "../agent/api";

const AutoPlaySwipeableViews = SwipeableViews;

interface mangaImages {
  label: string;
  imageUrl: string;
}

const ViewManga = () => {
  const chapterId: string = String(window.location.search.substring(1));
  const [mangaImages, setMangaImages] = useState<mangaImages[]>([]);
  const [maxSteps, setMaxSteps] = useState<number>(0);
  const isRendered = useRef<boolean>(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    //getImages
    if (!isRendered.current) {
      isRendered.current = true;
      MangaApis.viewManga(chapterId).then((response) => {
        const baseUrl: string = response.baseUrl;
        const quality: string = "data";
        const chapterHash: string = response.chapter.hash;

        setMaxSteps(response.chapter.data.length);
        response.chapter.data.forEach((x: any) => {
          setMangaImages((prev) => [
            ...prev,
            {
              label: "",
              imageUrl: `${baseUrl}/${quality}/${chapterHash}/${x}`,
            },
          ]);
        });
      });
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div style={{ alignItems: "center" }}>
      {mangaImages.length > 0 && (
        <Box sx={{ maxWidth: "70%", flexGrow: 1, alignContent: "center" }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}>
            <Typography>{mangaImages[activeStep].label}</Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents>
            {mangaImages.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component='img'
                    sx={{
                      height: "30%",
                      display: "block",
                      maxWidth: "50%",
                      overflow: "hidden",
                      width: "50%",
                      alignContent: "center",
                    }}
                    src={step.imageUrl}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position='static'
            activeStep={activeStep}
            nextButton={
              <Button
                size='small'
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size='small'
                onClick={handleBack}
                disabled={activeStep === 0}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      )}
    </div>
  );
};

export default ViewManga;

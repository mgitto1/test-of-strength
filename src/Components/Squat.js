import React, { useRef } from 'react';
// import '../public/style.css';
// eslint-disable-next-line
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import Counter from './Counter';
import Typical from 'react-typical';
// import Counter from './Counter';

const Squat = () => {
  const webcamRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 200, height: 200 },
      scale: 0.1,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  let array = [];
  let count = 0;
  let obj = {};
  let position = '';

  const detect = async (net, avgPosition = array, helperObj = obj) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      let leftShoulder = pose.keypoints[5].position.y;
      let rightShoulder = pose.keypoints[6].position.y;

      // Calculate user position
      const calculateAvg = (avgPosition, helperObj) => {
        if (pose.score > 0.5 && count <= 50) {
          console.log('calculating');
          avgPosition.push(leftShoulder);
          avgPosition.push(rightShoulder);
          const sum = avgPosition.reduce((a, b) => a + b, 0);
          helperObj.avg = sum / avgPosition.length || 0;
          helperObj.count = count;
          count++;
          return helperObj;
        } else {
          return helperObj;
        }
      };

      //Once user positition is calculated, use position to determine up and down
      const squat = () => {
        let squatObj = calculateAvg(avgPosition, helperObj);
        if (squatObj.count === 50) {
          console.log('running');
          if (leftShoulder && rightShoulder <= squatObj.avg + 100) {
            position = 'up';
          } else {
            position = 'down';
          }
        }
      };

      //Run function when pose score is good and avg is calculated
      if (pose.score > 0.4 && squat()) {
        squat();
      }
    }
  };

  const countFunc = () => {
    let squats = [];
    localStorage.setItem('squats', JSON.stringify([]));
    setInterval(() => {
      squats = JSON.parse(localStorage.getItem('squats'));
      if (position) {
        squats.push(position);
        console.log(squats);
        localStorage.setItem('squats', JSON.stringify(squats));
      }
    }, 3000);
  };

  countFunc();
  runPosenet();
  return (
    <div>
      <div className="Squat">
        <header className="Squat-header">
          <div id="text">
            <Typical
              loop={1}
              wrapper="b"
              steps={[
                'For your first test...',
                2000,
                'squats.',
                2000,
                'Please step in front of the camera to get started.',
                5000,
                'You must hold each position for 3 seconds for the exercise to count.',
                Infinity,
              ]}
            />
          </div>
          <Webcam
            ref={webcamRef}
            style={{
              marginTop: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 9,
              width: 660,
              height: 360,
            }}
          />
          <div id="counter">
            <Counter />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Squat;

import React, { useRef } from 'react';
// import '../public/style.css';
// eslint-disable-next-line
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import Counter from './Counter';
import Typical from 'react-typical';
// import Counter from './Counter';

const Pushup = () => {
  localStorage.setItem('workout', 'pushups');
  localStorage.setItem('WorkingOut', 'true');
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

      let leftEye = pose.keypoints[1].position.y;
      let rightEye = pose.keypoints[2].position.y;

      // Calculate user position
      const calculateAvg = (avgPosition, helperObj) => {
        if (pose.score > 0.5 && count <= 50) {
          console.log('calculating');
          avgPosition.push(leftEye);
          avgPosition.push(rightEye);
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
      const pushup = () => {
        let pushupObj = calculateAvg(avgPosition, helperObj);
        if (pushupObj.count === 50) {
          console.log('running');
          if (leftEye && rightEye <= pushupObj.avg + 100) {
            position = 'up';
          } else {
            position = 'down';
          }
        }
      };

      //Run function when pose score is good and avg is calculated
      if (pose.score > 0.3 && pushup()) {
        pushup();
      }
    }
  };

  const countFunc = () => {
    let pushups = [];
    localStorage.setItem('position', JSON.stringify([]));
    let intervalId = setInterval(() => {
      pushups = JSON.parse(localStorage.getItem('position'));
      if (position) {
        pushups.push(position);
        localStorage.setItem('position', JSON.stringify(pushups));
      }
      if (localStorage.getItem('WorkingOut') === 'false')
        clearInterval(intervalId);
    }, 2500);
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
                'This time you will be doing pushups.',
                2000,
                'Place your laptop on the floor and kneel in front of the camera to get started.',
                3000,
                'You must keep your eyes in view of the camera and hold each position for 2 seconds for the exercise to count.',
                Infinity,
              ]}
            />
            <br />
            <br />
            <i>
              Be sure to click on the counter to submit your score when you are
              done
            </i>
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

export default Pushup;

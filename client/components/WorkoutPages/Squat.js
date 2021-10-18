import React, {useRef} from 'react'
// import '../public/style.css';
// eslint-disable-next-line
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'
import Counter from './Counter'
import Typical from 'react-typical'

const Squat = () => {
  localStorage.setItem('workout', 'squats')
  localStorage.setItem('WorkingOut', 'true')
  localStorage.removeItem('CameraStatus')
  const webcamRef = useRef(null)

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: {width: 200, height: 200},
      scale: 0.1
    })
    setInterval(() => {
      detect(net)
    }, 100)
  }

  let array = []
  let count = 0
  let obj = {}
  let position = ''

  const detect = async (net, avgPosition = array, helperObj = obj) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      //Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Make Detections
      const pose = await net.estimateSinglePose(video)
      let leftShoulder = pose.keypoints[5].position.y
      let rightShoulder = pose.keypoints[6].position.y

      // Calculate user position
      const calculateAvg = (avgPosition, helperObj) => {
        if (pose.score > 0.5 && count <= 50) {
          localStorage.setItem('CameraStatus', 'Calculating')
          avgPosition.push(leftShoulder)
          avgPosition.push(rightShoulder)
          const sum = avgPosition.reduce((a, b) => a + b, 0)
          helperObj.avg = sum / avgPosition.length || 0
          helperObj.count = count
          count++
          return helperObj
        } else {
          return helperObj
        }
      }

      //Once user positition is calculated, use position to determine up and down
      const squat = () => {
        let squatObj = calculateAvg(avgPosition, helperObj)
        if (squatObj.count === 50) {
          if (leftShoulder && rightShoulder <= squatObj.avg + 100) {
            position = 'up'
          } else {
            position = 'down'
          }
        }
      }

      //Run function when pose score is good and avg is calculated
      if (pose.score > 0.4 && squat()) {
        squat()
      }
    }
  }

  const countFunc = () => {
    let squats = []
    localStorage.setItem('position', JSON.stringify([]))
    let intervalId = setInterval(() => {
      squats = JSON.parse(localStorage.getItem('position'))
      if (position) {
        squats.push(position)
        localStorage.setItem('position', JSON.stringify(squats))
      }
      if (localStorage.getItem('WorkingOut') === 'false')
        clearInterval(intervalId)
    }, 3000)
  }

  countFunc()
  runPosenet()
  return (
    <div>
      <div className="Squat-header">
        <header className="Squat">
          <div id="text">
            <Typical
              loop={1}
              wrapper="b"
              steps={[
                'For this test you will be doing squats...',
                2000,
                'Please step in front of the camera to get started.',
                5000,
                'You must hold each position for 3 seconds for the exercise to count.',
                Infinity
              ]}
            />
            <br />
            <br />
            <i>Be sure to click on the counter to submit your score</i>
          </div>
        </header>
        <section className="Webcam-Area">
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
              height: 360
            }}
          />
          {/* <div>
            <img
              class="workout-example"
              src="https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1530743652042-8AW6T0MPM6Q0JYEV6AO9/image-asset.gif"
              alt="squatting gif"
              style={{
                width: 260,
                height: 260,
                float: 'right',
              }}
            />
          </div> */}
        </section>
        <div id="counter">
          <Counter />
        </div>
      </div>
    </div>
  )
}

export default Squat

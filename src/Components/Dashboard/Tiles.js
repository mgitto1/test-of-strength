import React from 'react'
import { Link } from 'react-router-dom';

export default function Tiles() {
  return (
        <div id="tiles">
          <Link to="/squats">
            <div id="mini-individual-tile">
              <img
                src="https://img.icons8.com/ios/452/squats.png"
                id="tile-pic"
                alt="squat-icon"
              />
            </div>
          </Link>
          <Link to="/pushups">
            <div id="mini-individual-tile">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/pushups-560460.png"
                id="tile-pic"
                alt="pushup-icon"
              />
            </div>
          </Link>
          <Link to="/dips">
            <div id="mini-individual-tile">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/bench-dips-2-871091.png"
                id="tile-pic"
                alt="dip-icon"
              />
            </div>
          </Link>
          <div id="mini-individual-tile">
            <img
              src="https://i.pinimg.com/originals/40/fa/69/40fa69e6aa6319b5e70b566c493a4ab1.jpg"
              id="tile-pic"
              alt="coming-soon-icon"
            />
          </div>
          <div id="mini-individual-tile">
            <img
              src="https://i.pinimg.com/originals/40/fa/69/40fa69e6aa6319b5e70b566c493a4ab1.jpg"
              id="tile-pic"
              alt="coming-soon-icon"
            />
          </div>
        </div>
  )
}


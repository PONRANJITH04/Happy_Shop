//import {Link} from 'react-router-dom'
import './home.css'
import Button from '../../components/Button/Button'

const Home = () => (
  <>
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">We Are Changing The Way People Shop </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Button>Shop Now</Button>
        {/* <Link to="/products">
          <Button />
        </Link> */}
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home
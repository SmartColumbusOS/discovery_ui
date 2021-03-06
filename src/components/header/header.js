import './header.scss'
import { Component } from 'react'
import NavDropdown from '../nav-dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import cbusLogo from '../../assets/columbus-city-logo.png'
import smrtLogo from '../../assets/smrt-logo.png'
import { HamburgerButton } from 'react-hamburger-button';

export default class Header extends Component {
  static defaultProps = {
    scrollThreshold: 60
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    this.setState({
      collapsed: window.scrollY > this.props.scrollThreshold
    });
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  infoRow() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className='title'>
                <div className="slogan"><a href='https://smart.columbus.gov/'><h2>Smart Columbus</h2></a></div>
              </td>
              <td className='social'>
                <div >
                  <a href='https://www.facebook.com/SmartCbus/'><FontAwesomeIcon icon={faFacebookF} size="1x" /></a>
                  <a href='https://twitter.com/smartcbus'><FontAwesomeIcon icon={faTwitter} size="1x" /></a>
                  <a href='https://www.linkedin.com/company/smartcbus/'><FontAwesomeIcon icon={faLinkedinIn} size="1x" /></a>
                </div>
              </td>
              <td className='right'>
                <div >
                  <a href='https://www.columbus.gov'> <img src={cbusLogo} height="40"></img></a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  hamBurger() {
    return (
      <div className="hamburger">
      <HamburgerButton
      open={this.state.open}
      onClick={this.handleClick.bind(this)}
      width={18}
      height={15}
      strokeWidth={2}
      color='white'
      animationDuration={0.5}
     /></div>
    )
  }

  navBar() {
    const aboutData = {
      title: 'ABOUT',
      items: [
        { link: `https://www.${window.BASE_URL}/about/about-smart-columbus`, text: "About Smart Columbus" },
        { link: `https://www.${window.BASE_URL}/about/smart-city-projects`, text: "Smart City Projects" },
        { link: `https://www.${window.BASE_URL}/tools/how-to-use-this-site`, text: "How to Use The SCOS" }
      ]
    }

    const dataInAction = {
      title: 'DATA IN ACTION',
      items: [
        { link: `https://www.${window.BASE_URL}/data-stories/case-studies`, text: "Case Studies" },
        { link: `https://www.${window.BASE_URL}/data-stories/open-challenges`, text: "Open Challenges" },
        { link: `https://www.${window.BASE_URL}/data-stories/events`, text: "Events" }
      ]
    }

    const toolsData = {
      title: 'RESOURCES',
      items: [
        { link: `https://www.${window.BASE_URL}/tools/datasets-curated-for-visualization`, text: "Datasets Curated For Visualization" },
        { link: `https://www.${window.BASE_URL}/tools/explore-the-visualization-of-data`, text: "Explore the Visualization of Data" }
      ]
    }


    return (
      <div className={`nav-wrapper ${this.state.collapsed ? 'pinned' : ''} ${this.state.open ? 'open' : ''}`}>
        <NavDropdown data={aboutData} />
        <a className='nav-element purple' href={`https://www.${window.BASE_URL}/project-data`}>PROJECT DATA</a>
        <a className='nav-element highlighted' href="/">EXPLORE DATA</a>
        <a className='nav-element' href={`https://sharedata.${window.BASE_URL}`}>SHARE DATA</a>
        <NavDropdown data={dataInAction} />
        <NavDropdown data={toolsData} />
        <a className='nav-element' href={`https://www.${window.BASE_URL}/contact-us`}>CONNECT</a>
      </div >
    )
  }

  render() {
    return (
      <header>
        <div className={`logo ${this.state.collapsed ? 'scale-down' : 'rescale'}`}>
          <a href={`https://www.${window.BASE_URL}`}><img src={smrtLogo} height='96'></img></a>
        </div>
        <div className="wrapper">
          {this.infoRow()}
          {this.hamBurger()}
          {this.navBar()}
        </div>
      </header>
    )
  }
}



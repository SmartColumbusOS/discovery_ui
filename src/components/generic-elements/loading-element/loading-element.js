import './loading-element.scss'
import InlineSVG from 'react-svg-inline'
import loadingIcon from '../../../assets/loadingicon.svg'

const LoadingElement = () => {
  return (
    <loading-element>
      <div className='loading-container'>
        <InlineSVG svg={loadingIcon} height='5rem' accessibilityDesc='Loading...' />
      </div>
    </loading-element>
  )
}

export default LoadingElement
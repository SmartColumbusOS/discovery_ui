import DatasetCard from '../data-card'
import './dataset-list.scss'

const createDatasetCard = dataset => {
  return <DatasetCard key={dataset.id} dataset={dataset} />
}

export default ({ datasets = [] }) => {
  return (
    <dataset-list>
      <div className='search-placeholder' />
      {datasets.map(createDatasetCard) || <div />}
    </dataset-list>
  )
}
import { useEffect } from 'react'
import { navigate } from '@reach/router'


export default function() {
  const [data, updateData] = useState([])
  navigate('/')
  useEffect(async query => {

  }, [])

  return data
}

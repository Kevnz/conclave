import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'

export default function() {
  const [data, updateData] = useState([])

  useEffect(() => {
    navigate('/')
  }, [data])

  return updateData
}

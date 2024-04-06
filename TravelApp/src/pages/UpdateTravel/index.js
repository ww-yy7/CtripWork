import React from 'react'
import AddorUpdateTravel from '../../components/AddorUpdateTravel'

// 更新游记
export default function UpdateTravel({route}) {
  // console.log(route.params, 'route.params');
  return (
    <AddorUpdateTravel userInfo={route.params} />
  )
}

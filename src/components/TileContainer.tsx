import React, { useState } from 'react'
import StatsTiles from '@/components/StatsTiles';
import GettingDatasLength from '@/Tiles';

interface tile {
    icon : string , color : string , title : string , count : number
  }

export default function TileContainer() {
  const [data , setData] =  useState(GettingDatasLength());
  return (
    <>
 {
            data?.map((tile : tile, index : number) => {
              return (
                <StatsTiles key={index}
                  Icon={tile.icon}
                  color={tile.color}
                  title={tile.title}
                  count={tile.count} />
              )
            })
          }
    </>
  )
}

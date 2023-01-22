import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import React from 'react'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { TbH2, TbMusic, TbMusicOff } from 'react-icons/tb'

export default function Home() {
  const [cityname, setcityname] = useState('name')
  const [check, setcheck] = useState(false)
  const [apidata, setApidata] = useState()
  const [error, seterror] = useState(false)

  const getApiData = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?' +
          'q=' +
          cityname +
          '&appid=' +
          process.env.NEXT_PUBLIC_API_KEY +
          '&units=imperial'
      )
      const data = await response.json()
      if (data.cod == 404) {
        throw Error('Something went wrong. Please try again later')
      } else {
        seterror(false)
        setApidata(data)
      }
    } catch (err) {
      setApidata()
      seterror(err.message)
    }
  }

  const [music, setmusic] = useState(true)
  const [audio, setAudio] = useState()
  useEffect(() => {
    setAudio(new Audio('/audio.mp3'))
  }, [])

  useEffect(() => {
    console.log(apidata)
  }, [apidata])

  useEffect(() => {
    console.log('useEffect ran')

    if (cityname == '') setcheck(true)
    else setcheck(false)
  }, [cityname])

  function handle() {
    if (cityname == 'name' || cityname == '') {
      setcheck(true)
    } else {
      getApiData()
    }
  }

  return (
    <>
      <div className='cont'>
        <div className='box'>
          <div className='box2'>
            <input
              class='textfield'
              placeholder='Enter city name..'
              type='text'
              onChange={(e) => setcityname(e.target.value)}
            />
            <span className='validation'>
              {' '}
              {check ? 'Please enter city name' : null}
            </span>
          </div>
          <button class='button' onClick={handle}>
            Search
          </button>{' '}
          {music ? (
            <button
              class='button2'
              onClick={() => {
                audio.play()
                setmusic(false)
              }}
            >
              <TbMusic />
            </button>
          ) : (
            <button
              class='button2'
              onClick={() => {
                audio.pause()
                setmusic(true)
              }}
            >
              <TbMusicOff />
            </button>
          )}
        </div>

        {error ? (
          <div className='dataerror'>
            <p>
              {error
                ? 'Seems there is a spelling error. Please check and try again.'
                : null}
            </p>
          </div>
        ) : null}

        {apidata ? null : (
          <div className='msg'>
            <p>
              {apidata
                ? null
                : 'Welcome to the Weather Application by Nextupgrad Web Solution. Type in the location to get the current weather details.'}
            </p>
            <h2>{apidata ? null : 'Developed By - Piyush Verma'}</h2>
          </div>
        )}

        <div className='data'> {apidata ? <Card item={apidata} /> : null}</div>
      </div>
      <div></div>
    </>
  )
}

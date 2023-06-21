import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.scss'
import { Box, Button } from '@mui/material'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON
)

function App() {
  const [card, setCard] = useState<any | null>()

  const [showingCard, setShowingCard] = useState(false)

  const [randomNumber, setRandomNumber] = useState(generateRandomNumber(1000))

  function generateRandomNumber(maxValue: number) {
    return Math.floor(Math.random() * (maxValue + 1))
  }

  async function getCards() {
    const { data } = await supabase
      .from('my_table')
      .select()
      .range(randomNumber, randomNumber)
      if (data !== null && data.length > 0) {
        setCard(data[0]);
      }
  }

  async function handleButtonClick() {
    if (showingCard) {
      await getCards()

      setShowingCard(false)
    } else {
      setShowingCard(true)
      setRandomNumber(generateRandomNumber(1000))
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  console.log(card)
  return (
    <>
      <div>
        <Box className="cardWrapper">
          <p className="cardTitle">{card?.flds[0]}</p>
          <p className="cardPronounciation">
            {showingCard ? card?.flds[1] : ''}
          </p>
          <p className="cardDescription">
            {showingCard ? card?.flds[2] : ''}
          </p>
          <Button
            variant="contained"
            className={`cardButton `}
            onClick={() => handleButtonClick()}
          >
            {showingCard ? 'Next' : 'Show Card'}
          </Button>
        </Box>
      </div>
    </>
  )
}

export default App

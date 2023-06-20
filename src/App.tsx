import { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss'
import { Box, Button } from '@mui/material';


const supabase = createClient("https://ucexdsdxcrgpnektgmbe.supabase.co", import.meta.env.VITE_SUPABASE_ANON);

function App() {
  
  const [cards, setCards] = useState<any>([])

  const [cardIndex, setCardIndex] = useState(0)

  const [showingCard, setShowingCard] = useState(false)

  
  async function getCards() {
    const { data } = await supabase.from("my_table").select().range(0,9);
    setCards(data);
  }

  function handleButtonClick() {
    
    if (showingCard) {
      setCardIndex(cardIndex + 1)
      setShowingCard(false)
    } else {
      setShowingCard(true)
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  console.log(cards)
  return (
    <>
      <div>
        <Box className='cardWrapper'>
          <p className='cardTitle'>{cards[cardIndex]?.flds[0]}</p>
          <p className='cardDescription'>{showingCard ? cards[cardIndex]?.flds[2] : ''}</p>
          <Button variant="contained" className={`cardButton `} onClick={() => handleButtonClick()}>
            {showingCard ? 'Next' : 'Show Card'}
          </Button>
        </Box>
      </div>
      
    </>
  )
}

export default App

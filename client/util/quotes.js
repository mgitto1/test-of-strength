import React from 'react'

class Quotes extends React.Component {
  constructor(props) {
    super(props)
    this.quotes = [
      {
        quote: "I'm not sure if I was the first man in space or the last dog.",
        source: '-Yuri Gagarin',
        year: '1961',
        tags: 'Humor'
      },
      {
        quote:
          "'We’ll never survive!' 'Nonsense. You’re only saying that because no one ever has.'",
        source: '-William Goldman',
        citation: 'The Princess Bride',
        year: '1987',
        tags: 'Inspirational'
      },
      {
        quote:
          "You know, Hobbes, some days even my lucky rocket ship underpants don't help.",
        source: '-Bill Watterson',
        citation: 'Calvin and Hobbes',
        tags: 'Humor'
      },
      {
        quote:
          'You people talk about the living and the dead as if they were two mutually exclusive categories. As if you cannot have a river that is also a road, or a song that is also a color.',
        source: '-Neil Gaiman',
        citation: 'American Gods',
        year: '2001',
        tags: 'Spirituaity'
      },
      {
        quote:
          'Yet man will never be perfect until he learns to create and destroy; he does know how to destroy, and that is half the battle.',
        source: '-Alexandre Dumas',
        citation: 'The Count of Monte Cristo',
        year: '1844',
        tags: 'Humanity'
      },
      {
        quote:
          'Never let your sense of morals prevent you from doing what is right.',
        source: '-Isaac Asimov',
        citation: 'Foundation',
        year: '1951',
        tags: 'Spirituality'
      },
      {
        quote:
          "Let's think the unthinkable, let's do the undoable. Let us prepare to grapple with the ineffable itself, and see if we may not eff it after all.",
        source: '-Douglas Adams',
        citation: "Dirk Gently's Holistic Detective Agency",
        year: '1987',
        tags: 'Inspirational'
      },
      {
        quote:
          'A creative man is motivated by the desire to achieve, not by the desire to beat others.',
        source: '-Ayn Rand',
        tags: 'Inspirational'
      },
      {
        quote:
          "I'm not dumb. I just have a command of thoroughly useless information.",
        source: '-Bill Watterson',
        citation: 'Calvin and Hobbes',
        tags: 'Humor'
      },
      {
        quote:
          'A bone to the dog is not charity. Charity is the bone shared with the dog, when you are just as hungry as the dog.',
        source: '-Jack London',
        tags: 'Humanity'
      }
    ]
    this.getRandomQuote = this.getRandomQuote.bind(this)
  }

  getRandomQuote() {
    let randomQuote = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ]
    let usedQuotes = []
    if (usedQuotes.length === this.quotes.length) {
      usedQuotes = []
    }

    if (usedQuotes.includes(randomQuote) === false) {
      usedQuotes.push(randomQuote)
      return randomQuote
    } else {
      this.getRandomQuote()
    }
  }

  render() {
    return (
      <div id="quote">
        <strong>
          {' '}
          {this.getRandomQuote().quote}
          <br />
          <br />
          {this.getRandomQuote().source}
        </strong>
      </div>
    )
  }
}

export default Quotes

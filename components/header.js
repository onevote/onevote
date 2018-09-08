import React from 'react'
import Link from 'next/link'
import Icon from '@hackclub/icons'

const link = 'https://onevote.now.sh'
const twitterURL = (text, url) =>
  `https://twitter.com/intent/tweet?text=${text
    .split(' ')
    .join('%20')}&url=${url}`
const facebookURL = url => `https://www.facebook.com/sharer/sharer.php?u=${url}`

export default () => (
  <header>
    <div className="header__content">
      <Link href="/" prefetch>
        <a className="logo">OneVote</a>
      </Link>
      <div className="social">
        <a href={twitterURL('OneVote', link)}>
          <Icon glyph="twitter" size={24} />
        </a>
        <a href={facebookURL(link)}>
          <Icon glyph="facebook" size={24} />
        </a>
      </div>
    </div>
    <style jsx>{`
      header {
        min-height: 144px;
        width: 100%;
        display: flex;
        align-items: center;
      }
      .header__content {
        width: 1000px;
        max-width: 100%;
        height: 72px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
      }
      .logo {
        color: #666;
        font-size: 24px;
        font-weight: 800;
        text-decoration: none;
      }
      .social a {
        color: #ec008c;
        margin-left: 15px;
      }
      @media (max-width: 1064px) {
        .header__content {
          width: 100%;
          padding-left: 32px;
          padding-right: 32px;
        }
      }
    `}</style>
  </header>
)

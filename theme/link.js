import React from 'react'
import { default as Next } from 'next/link'
import { Link as A, Button, LargeButton } from '@hackclub/design-system'

const Link = ({ is = 'a', href = '/', ...props }) => {
  const Tag = {
    a: A,
    button: Button,
    largeButton: LargeButton
  }[is]
  return (
    <Next href={href}>
      <Tag {...props} />
    </Next>
  )
}

Link.button = props => <Link is="button" {...props} />
Link.largeButton = props => <Link is="largeButton" {...props} />
Link.btn = Link.button
Link.lgBtn = Link.largeButton

export default Link

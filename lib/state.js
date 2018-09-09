import { Container } from 'unstated'

class AppContainer extends Container {
  state = {
    stage: 0
  }

  next() {
    this.setState(state => ({ stage: state.stage + 1 }))
  }

  back() {
    this.setState(state => ({ stage: state.stage - 1 }))
  }
}

export default AppContainer

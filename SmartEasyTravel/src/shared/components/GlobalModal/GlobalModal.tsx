import React from 'react'
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export interface Props { }

interface State {
  isShow: boolean,
  title: string,
  content: string
}

class ModalScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isShow: false,
      title: '',
      content: ''
    }
  }

  alertMessage = (iTitle: string, iContent: string) => {
    this.setState({
      isShow: true,
      title: iTitle,
      content: iContent
    })
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  render() {
    return (

      <Modal
        // animationType="fade"
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => {
          this.closeModal()
        }}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0.6)'} barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
          <View style={styles.main}>
            <View style={styles.boxContent}>
              <View style={[styles.boxTitle, { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#008BD2' }]}>
                <Text style={[styles.title]}>{this.state.title}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.messgae} numberOfLines={3}>{this.state.content}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.closeModal()}>
                  <Text style={styles.textButton}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>)
  }
}

export default (ModalScreen)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
  boxTitle: {
    height: 45,
    textAlign: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#008BD2'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  messgae: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#008BD2',
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10
  },
  textButton: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  }
})

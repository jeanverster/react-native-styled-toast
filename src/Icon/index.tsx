import * as React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import styled from 'styled-components/native'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

export type IconProps = SpaceProps &
  ColorProps & {
    name: string
    family: string
    color?: string
    size: number
    testID?: string
  }
const Icon: React.SFC<IconProps> = (props) => {
  let Icon
  switch (props.family) {
    case 'Entypo':
      Icon = Entypo
      break
    case 'EvilIcons':
      Icon = EvilIcons
      break
    case 'Feather':
      Icon = Feather
      break
    case 'FontAwesome':
      Icon = FontAwesome
      break
    case 'Foundation':
      Icon = Foundation
      break
    case 'Ionicons':
      Icon = Ionicons
      break
    case 'MaterialCommunityIcons':
      Icon = MaterialCommunityIcons
      break
    case 'MaterialIcons':
      Icon = MaterialIcons
      break
    case 'Octicons':
      Icon = Octicons
      break
    case 'SimpleLineIcons':
      Icon = SimpleLineIcons
      break
    case 'Zocial':
      Icon = Zocial
      break
    default:
      Icon = Ionicons
  }
  const StyledIcon = styled(Icon)`
    ${color};
    ${space};
  `
  return <StyledIcon name={props.name} {...props} />
}

export default Icon

Icon.defaultProps = {
  size: 20,
  color: 'success',
  family: 'Feather',
  name: 'check-circle'
}

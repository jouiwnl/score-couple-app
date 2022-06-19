import styled from 'styled-components/native'

export const MediaWrapper = styled.TouchableOpacity`
  margin-right: 15px;
`

export const MediaTitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  
  margin-top: 5px;
  max-width: 100px;
`

export const MediaImage = styled.Image`
  width: 98px;
  height: 148px;
`

export const MediaRating = styled.View`
  margin-top: 10px;
  max-width: 100px;
  margin-left: -3px;
`

export const MediaStatus = styled.View`
  width: 98px;
  height: 5px;

  background: ${(props => {
    if (props.statusColor == "CANCELED") {
      return '#FA8072';
    }

    if (props.statusColor == "COMPLETED") {
      return '#98FB98';
    }

    if (props.statusColor == "DOING") {
      return '#FFE4B5';
    }

    if (props.statusColor == "NOTSTARTED") {
      return '#464646';
    }
  })};
`
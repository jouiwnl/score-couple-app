import styled from 'styled-components/native'

export const MovieWrapper = styled.TouchableOpacity`
  margin-right: 15px;
`

export const MovieTitle = styled.Text`
  font-size: 13px;
  color: #fff;
  margin-top: 5px;
  max-width: 100px;
`

export const MovieImage = styled.Image`
  width: 98px;
  height: 148px;
`

export const MovieRating = styled.View`
  max-width: 100px;
`

export const MovieStatus = styled.View`
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
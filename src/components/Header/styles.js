import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 14px;
  padding-right: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Username = styled.Text`
  color: #fff;
  margin-left: 10px;
  font-size: 15px;
`

export const Avatar = styled.TouchableOpacity`
  background: #323235;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const OnlineStatus = styled.View`
  background: #14b866;

  width: 13px;
  height: 13px;
  border-radius: 10px;
  border: 2px solid #000014;

  position: absolute;
  right: 0;
  bottom: 0;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`

`
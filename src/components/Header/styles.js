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
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const Username = styled.Text`
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};

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
  border: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return `2px solid ${theme.COLORS.BACKGROUND_DARK}`
    }

    return `2px solid ${theme.COLORS.BACKGROUND_LIGHT}`
  }};

  position: absolute;
  right: 0;
  bottom: 0;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 15px;
`
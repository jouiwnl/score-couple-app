import styled from 'styled-components/native'

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_DARK};

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const FormWrapper = styled.View`
  width: 350px;
  height: 500px;
`
export const Logo = styled.Image`
  width: 100%;
  height: 45px;
`
export const FormInputs = styled.View`
  padding: 14px;
  margin-top: 50px;
`

export const FormInput = styled.View`
  border: ${({ theme }) => `2px solid ${theme.COLORS.INPUT_COLOR}`};
  border-radius: 10px;
  color: #fff;
  height: 55px;
  font-size: 15px;
  padding-left: 15px;
  margin-bottom: 17px;

  display: flex;
  flex-direction: row;
  align-items: center;
`

export const InputLabel = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 500;

  margin-left: 5px;
  margin-bottom: 10px;
`

export const InputIcon = styled.View`
  margin-right: 10px;
`

export const Input = styled.TextInput`
  flex: 1; 
  padding-right: 10px;
  color: #fff;
`
export const ActionButtons = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`
export const LoginButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.INPUT_COLOR};
  width: 90%;
  text-align: center;
  justify-content: center;
  align-items: center;
`
export const ButtonLabel = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`
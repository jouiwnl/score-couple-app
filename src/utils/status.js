import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';


export const status = [
  {
    value: "NOTSTARTED", 
    description: "A fazer", 
    icon: () => <FontAwesome5 name="question" size={20} color="#464646" />,
    color: '#464646'
  }, 
  {
    value: "DOING", 
    description: "Fazendo", 
    icon: () => <Entypo name="progress-two" size={20} color="#FF8C00" />,
    color: '#FF8C00'
  }, 
  {
    value: "COMPLETED", 
    description: "Feito", 
    icon: () => <MaterialIcons name="file-download-done" size={20} color="#98FB98" />,
    color: '#98FB98'
  }, 
  {
    value: "CANCELED", 
    description: "Cancelado", 
    icon: () => <MaterialIcons name="cancel" size={20} color="#FA8072" />,
    color: '#FA8072'
  }
];
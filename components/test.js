import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";


const Test = (Props) => {


  return (
    <View>
       <Text>Test</Text>
    </View>
  );
};
export default Test;



// <View style={styles.centeredView}>
//           <Modal
//             animationType="slide"
//             transparent={false}
//             visible={this.state.modalVisible}
//             onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//             }}
//           >
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <View style={styles.container}>
//                   <Card title="Confirm Business Detail">
//                     <Text style={{ fontSize: width * 0.05 }}>
//                       Business Name: 
//                     </Text>
//                     <Text style={{ fontSize: width * 0.05 }}>
//                       Trading Name: 
//                     </Text>
//                     <Text style={{ fontSize: width * 0.05 }}>
//                       Phone Number: 
//                     </Text>
//                     <Text style={{ fontSize: width * 0.05 }}>
//                       Address:
//                     </Text>
//                     <TouchableOpacity style={styles.buttonstyle}>
//                       <Text style={{ textAlign: "center" }}>Confirm</Text>
//                     </TouchableOpacity>
//                   </Card>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>
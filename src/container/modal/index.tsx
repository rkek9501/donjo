import React from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import useModalStore from "../../store/modal";
import MemberModal from "./member";

const CustomModal = () => {
  const modal = useModalStore((state: any) => state);
  const modalCallback = (response: any) => modal?.data?.callback?.(response) || null;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal.isOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          modal.closeModal();
        }}
      > 
        {modal.data?.type === "member"
          && <MemberModal
            onClose={modal.closeModal}
            data={modal.data?.data}
            callback={modalCallback} />
        }
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default CustomModal;

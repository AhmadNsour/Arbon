import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const CustomActionSheet = ({
  visible,
  onClose,
  options,
  title,
  content,
  buttonText,
  dismissible,
  fullView,
  showCloseIcon,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={!fullView}
      visible={visible}
      onRequestClose={() => {
        if (dismissible) {
          onClose();
        }
      }}>
      <View
        style={fullView ? styles.fullModalBackground : styles.modalBackground}>
        <View style={styles.modalContainer}>
          {showCloseIcon && (
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                onClose();
                option.onPress();
              }}>
              <Image source={{uri: option.image}} style={styles.image} />
              <Text style={styles.text}>{option.text}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>{buttonText || 'Cancel'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

CustomActionSheet.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ).isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  dismissible: PropTypes.bool,
  fullView: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
};

CustomActionSheet.defaultProps = {
  title: '',
  content: '',
  buttonText: 'Cancel',
  dismissible: true,
  fullView: false,
  showCloseIcon: true,
};

const styles = StyleSheet.create({
  fullModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    color: 'gray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: 'red',
  },
});

export default CustomActionSheet;

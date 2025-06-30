import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    color: '#444',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
  },
  inputFocused: {
    borderColor: '#428AF8',
    shadowColor: '#428AF8',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#E53935',
  },
  inputMultiline: {
    minHeight: 80,
    maxHeight: 160,
    textAlignVertical: 'top',
  },
  error: {
    marginTop: 4,
    color: '#E53935',
    fontSize: 12,
  },
});
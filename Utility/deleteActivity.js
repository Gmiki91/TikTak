import { Alert } from 'react-native';
const deleteActivity = activity => {
    return new Promise((resolve, reject) => {
        Alert.alert(`Are you sure you want to delete ${activity.name}?`, '', [
            {
                text: "Cancel",
                onPress: () => reject('Cancel clicked'),
                style: "cancel"
            },
            {
                text: "Delete", onPress: () => {
                    fetch(`http://192.168.31.203:3030/${activity._id}`, { method: 'DELETE' })
                        .then(() => resolve('Delete clicked'));
                }
            }
        ],
            {
                cancelable: true,
                onDismiss: () => reject('dismissed')

            }
        )
    })
}
export default deleteActivity;
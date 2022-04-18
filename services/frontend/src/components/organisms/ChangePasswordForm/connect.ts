import {connect} from "react-redux";
import {Dispatch} from "redux";
import {authRequestsSlice, State} from "store/";
import userFriendlyErrorMessages from "utils/userFriendlyErrorMessages";

interface StateProps {
    /** The error message generated by the Change Password process. */
    error?: string;

    /** The loading state while the Change Password process is running. */
    loading?: boolean;
}

interface DispatchProps {
    /** Handler for submitting the form. */
    onSubmit: (oldPassword: string, newPassword: string) => void;
}

export interface ConnectedProps extends StateProps, DispatchProps {}

const errorMessageMap = (error: string) => {
    switch (error) {
        case "Invalid login":
            return "Wrong old password";
        default:
            return userFriendlyErrorMessages(error);
    }
};

const mapStateToProps = (state: State): StateProps => ({
    error: errorMessageMap(authRequestsSlice.changePassword.selectors.selectErrorMessage(state)),
    loading: authRequestsSlice.changePassword.selectors.selectLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onSubmit: (oldPassword, newPassword) =>
        dispatch(authRequestsSlice.changePassword.actions.request({oldPassword, newPassword}))
});

export default connect(mapStateToProps, mapDispatchToProps);

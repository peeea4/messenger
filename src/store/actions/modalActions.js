export function showModal(modalStatus) {
    console.log(modalStatus);
	return {
		type: "SHOW_MODAL",
		payload: modalStatus
	}
}
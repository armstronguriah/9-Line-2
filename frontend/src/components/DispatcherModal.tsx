
import { Modal, Button } from "react-bootstrap";
import type { MedevacRequest } from "./MedevacRequest";

interface DispatcherModalProps {
    show: boolean;
    onClose: () => void;
    request: MedevacRequest | null;
}

export default function DispatcherModal({
                                            show,
                                            onClose,
                                            request
                                        }: DispatcherModalProps) {

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    MEDEVAC Request Details
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {request ? (
                    <div>
                        <p>Request ID: {request.id}</p>
                    </div>
                ) : (
                    <p>No request selected.</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

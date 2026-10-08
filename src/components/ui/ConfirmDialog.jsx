import Button from './Button'
import Modal from './Modal'

const ConfirmDialog = ({ title, message, confirmLabel = 'Confirm', onConfirm, onClose, isLoading = false, testIds = {} }) => (
  <Modal title={title} onClose={onClose} size='sm' testId={testIds.dialog}>
    <div className='flex flex-col gap-6 p-6'>
      <p className='text-gray-600'>{message}</p>
      <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-3'>
        <Button variant='outline' onClick={onClose} data-testid={testIds.cancel}>Cancel</Button>
        <Button variant='danger' onClick={onConfirm} disabled={isLoading} data-testid={testIds.confirm}>
          {isLoading ? 'Please wait...' : confirmLabel}
        </Button>
      </div>
    </div>
  </Modal>
)

export default ConfirmDialog

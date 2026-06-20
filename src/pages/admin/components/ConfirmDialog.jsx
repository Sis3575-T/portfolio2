const ConfirmDialog = ({ message = 'Are you sure?', onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
      <div className="modal-body">
        <div className="confirm-dialog">
          <div className="confirm-dialog-icon">🗑️</div>
          <h4>Confirm Delete</h4>
          <p>{message}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn-admin btn-admin-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn-admin btn-admin-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;

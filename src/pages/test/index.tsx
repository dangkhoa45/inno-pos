import { useState } from 'react'

import DailyReportModal from '../../components/DailyReportModal'
import ImportFileModal from '../../components/ImportFileModal'
import ReceiptModal from '../../components/ReceiptModal'
import RepairRequestModal from '../../components/RepairRequestModal'
import SettingsDrawer from '../../components/SettingsDrawer'

export const TestPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repairModalOpen, setRepairModalOpen] = useState(false)
  const [receiptModalOpen, setReceiptModalOpen] = useState(false)
  const [dailyReportModalOpen, setDailyReportModalOpen] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Instead of login, open the Daily Report Modal
    setDailyReportModalOpen(true)
  }

  const handleRepairRequest = () => {
    setRepairModalOpen(true)
  }

  const handleCreateReceipt = () => {
    setReceiptModalOpen(true)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 400,
          margin: '0 auto',
          padding: 20,
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>

        {/* Blue button for Repair Request */}
        <button
          onClick={handleRepairRequest}
          style={{
            padding: '12px 20px',
            backgroundColor: '#1e88e5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(30, 136, 229, 0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1565c0'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow =
              '0 4px 8px rgba(30, 136, 229, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#1e88e5'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow =
              '0 2px 4px rgba(30, 136, 229, 0.2)'
          }}
        >
          Xử lý yêu cầu sửa chữa
        </button>

        {/* Blue button for Create Receipt */}
        <button
          onClick={handleCreateReceipt}
          style={{
            padding: '12px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1976d2'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow =
              '0 4px 8px rgba(33, 150, 243, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2196f3'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow =
              '0 2px 4px rgba(33, 150, 243, 0.2)'
          }}
        >
          Tạo phiếu thu
        </button>

        {/* Buttons for new modals */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setImportModalOpen(true)}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#673ab7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Mở Import
          </button>
          <button
            onClick={() => setSettingsDrawerOpen(true)}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Mở Cài đặt
          </button>
        </div>
      </div>

      <RepairRequestModal
        open={repairModalOpen}
        onClose={() => setRepairModalOpen(false)}
      />

      <ReceiptModal
        open={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
      />

      <DailyReportModal
        open={dailyReportModalOpen}
        onClose={() => setDailyReportModalOpen(false)}
      />

      <ImportFileModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />

      <SettingsDrawer
        open={settingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
      />
    </>
  )
}

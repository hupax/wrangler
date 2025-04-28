import React, { useState, useEffect } from 'react'

// 定义用户数据接口
interface User {
  id: number
  name: string
  email: string
  phone: string
}

// 动态表格组件
const DynamicTable: React.FC = () => {
  // 用户数据状态
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800000000',
    },
    { id: 2, name: '李四', email: 'lisi@example.com', phone: '13900000000' },
    { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13700000000' },
  ])

  // 表单数据状态
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  })

  // 编辑模式状态
  const [editMode, setEditMode] = useState(false)

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 提交表单 - 添加或更新用户
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('请填写所有字段')
      return
    }

    if (editMode) {
      // 更新现有用户
      setUsers(users.map(user => (user.id === formData.id ? formData : user)))
    } else {
      // 添加新用户
      const newId =
        users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1
      setUsers([...users, { ...formData, id: newId }])
    }

    // 重置表单
    resetForm()
  }

  // 开始编辑用户
  const handleEdit = (user: User) => {
    setFormData(user)
    setEditMode(true)
  }

  // 删除用户
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  // 取消编辑
  const handleCancel = () => {
    resetForm()
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      email: '',
      phone: '',
    })
    setEditMode(false)
  }

  return (
    <div className="dynamic-table-container">
      <h1>动态表格 CRUD 示例</h1>

      <div className="form-container">
        <h2>{editMode ? '编辑用户' : '添加用户'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">姓名:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">邮箱:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">电话:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              {editMode ? '更新' : '添加'}
            </button>
            {editMode && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                取消
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-container">
        <h2>用户列表</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>电话</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    编辑
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`
        .dynamic-table-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-container {
          margin-bottom: 30px;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 5px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .button-group {
          margin-top: 20px;
        }

        button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-right: 10px;
        }

        .submit-btn {
          background-color: #4caf50;
          color: white;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .cancel-btn {
          background-color: #f0f0f0;
          color: #333;
        }

        .cancel-btn:hover {
          background-color: #e0e0e0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th,
        td {
          border: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
        }

        th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tr:hover {
          background-color: #f1f1f1;
        }

        .edit-btn {
          background-color: #2196f3;
          color: white;
        }

        .edit-btn:hover {
          background-color: #0b7dda;
        }

        .delete-btn {
          background-color: #f44336;
          color: white;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
        }
        `}
      </style>
    </div>
  )
}

export default DynamicTable

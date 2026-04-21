import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Calendar from '../../components/ui/Calendar'
import { 
  Plus, Edit2, Trash2, Download, 
  RefreshCw, Flag, BellRing
} from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  projectsCount: number
  status: 'ACTIVO' | 'INACTIVO'
}

const INITIAL_DATA: Category[] = [
  { id: '1', name: 'Desarrollo Web', description: 'Tecnologias de frontend y backend', projectsCount: 24, status: 'ACTIVO' },
  { id: '2', name: 'Diseño UX/UI', description: 'Interfaces y experiencia de usuario', projectsCount: 18, status: 'ACTIVO' },
  { id: '3', name: 'Data Science', description: 'Análisis de datos, Machine Learning', projectsCount: 9, status: 'ACTIVO' },
  { id: '4', name: 'Marketing Digital', description: 'Campañas SEO y SEM', projectsCount: 0, status: 'INACTIVO' },
  { id: '5', name: 'Gestión de Proyectos', description: 'Metodologías Ágiles y Scrum', projectsCount: 12, status: 'ACTIVO' },
]

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_DATA)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<Category | null>(null)
  
  // Search and filter (visual only for now)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleEditClick = (category: Category) => {
    setEditingId(category.id)
    setEditFormData({ ...category })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditFormData(null)
  }

  const handleSaveEdit = () => {
    if (editFormData) {
      setCategories(categories.map(c => c.id === editFormData.id ? editFormData : c))
      setEditingId(null)
      setEditFormData(null)
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  const handleCreateNew = () => {
    // Generate simple ID
    const newId = (Math.max(...categories.map(c => parseInt(c.id))) + 1).toString()
    const newCat: Category = {
      id: newId,
      name: 'Nueva Categoría',
      description: 'Descripción...',
      projectsCount: 0,
      status: 'ACTIVO'
    }
    setCategories([newCat, ...categories])
    setEditingId(newCat.id)
    setEditFormData(newCat)
  }

  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      {/* Calendario */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">Calendario</h3>
        <Calendar />
      </div>

      {/* Notificaciones */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">Notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Flag size={16} className="text-action shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 leading-tight">Se ha creado una nueva categoría "Blockchain".</p>
              <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BellRing size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 leading-tight">Categoría "Marketing Digital" marcada como inactiva.</p>
              <p className="text-xs text-gray-400 mt-1">Ayer, 14:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">Enlaces rápidos</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-action transition-all">
            <Download size={16} />
            <span>Exportar Categorías (CSV)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-action transition-all">
            <RefreshCw size={16} />
            <span>Reasignar Proyectos Huérfanos</span>
          </div>
        </div>
      </div>
    </div>
  )

  const filteredCategories = categories.filter(c => 
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || c.status === statusFilter)
  )

  return (
    <div className="min-h-screen bg-[#eef3f8] flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Categorías" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          
          {/* MAIN CONTENT AREA */}
          <div className="flex-1 p-4 md:p-8">
            <header className="mb-6">

            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mx-auto max-w-5xl">
              <h1 className="text-2xl font-bold text-textMain mb-6">Gestión de Categorías</h1>

              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex flex-1 gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:max-w-xs">
                    <input 
                      type="text" 
                      placeholder="Buscar por nombre o descripción..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-action"
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white min-w-[150px]"
                  >
                    <option value="">Todos los estados</option>
                    <option value="ACTIVO">Activos</option>
                    <option value="INACTIVO">Inactivos</option>
                  </select>
                </div>
                <button 
                  onClick={handleCreateNew}
                  className="flex items-center gap-2 bg-action hover:brightness-110 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm w-full md:w-auto justify-center"
                >
                  <Plus size={16} /> Crear Categoría
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[13px] text-gray-700 font-bold uppercase">
                      <th className="py-3 px-4 rounded-tl-lg">Nombre</th>
                      <th className="py-3 px-4">Descripción</th>
                      <th className="py-3 px-4">Proyectos</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-center rounded-tr-lg">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredCategories.map((cat, index) => {
                      const isEditing = editingId === cat.id
                      const isLast = index === filteredCategories.length - 1

                      if (isEditing && editFormData) {
                        return (
                          <tr key={cat.id} className={`bg-blue-50/30 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                            <td className="py-2.5 px-4">
                              <input 
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:border-action outline-none text-sm bg-white"
                              />
                            </td>
                            <td className="py-2.5 px-4">
                              <input 
                                type="text"
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:border-action outline-none text-sm bg-white"
                              />
                            </td>
                            <td className="py-2.5 px-4 text-gray-500 whitespace-nowrap">
                              {editFormData.projectsCount} proyectos
                            </td>
                            <td className="py-2.5 px-4">
                              <select 
                                value={editFormData.status}
                                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as 'ACTIVO'|'INACTIVO' })}
                                className="p-2 border border-gray-300 rounded outline-none text-sm bg-white text-gray-700 font-medium w-[100px]"
                              >
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={handleSaveEdit}
                                  className="bg-action text-white px-3 py-1.5 rounded text-sm font-medium hover:brightness-110"
                                >
                                  Guardar
                                </button>
                                <button 
                                  onClick={handleCancelEdit}
                                  className="bg-white border text-gray-600 border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-50"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      }

                      return (
                        <tr key={cat.id} className={`hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}>
                          <td className="py-4 px-4 font-bold text-gray-800">{cat.name}</td>
                          <td className="py-4 px-4 text-gray-500">{cat.description}</td>
                          <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                            <span className="font-semibold text-gray-800">{cat.projectsCount}</span> proyectos
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              cat.status === 'ACTIVO' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {cat.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleEditClick(cat)}
                                className="p-1.5 text-gray-400 hover:text-action hover:bg-blue-50 rounded-md transition-colors border border-transparent hover:border-blue-100"
                                title="Editar"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(cat.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredCategories.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No se encontraron categorías.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination (Visual) */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-sm">
                <span className="text-gray-500">
                  Mostrando {filteredCategories.length} de {filteredCategories.length} categorías
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed bg-gray-50">Anterior</button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Siguiente</button>
                </div>
              </div>

            </div>
          </div>

          {/* ASIDE DERECHO */}
          <aside className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0 bg-transparent">
            <RightPanelContent />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default CategoriesPage

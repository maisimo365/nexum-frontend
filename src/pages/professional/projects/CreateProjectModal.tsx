import { useState, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { CheckCircle, FolderOpen } from "lucide-react";
import {
  createProject, updateProject, suggestCategory,
  type Skill, type Project,
} from "../../../services/project.service";
import { getProjectFiles } from "../../../services/File.service";
import Step1Form from "./Step1Form";
import Step2Files, { type UploadedFile } from "./Step2Files";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onDelete?: (id: number) => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-[340px] mx-4 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
        <div className="text-center">
          <h3 className="text-[16px] font-bold text-[#1a1a2e] mb-1">¡Proyecto guardado con éxito!</h3>
          <p className="text-[13px] text-[#5b6472] leading-relaxed">
            Tu proyecto ha sido guardado correctamente en tu portafolio.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full h-10 bg-[#003087] text-white text-[13px] font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <FolderOpen size={15} /> Ir a Mis Proyectos
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CreateProjectModal = ({ isOpen, onClose, projectToEdit, onDelete }: CreateProjectModalProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showFormatError, setShowFormatError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmNoFiles, setShowConfirmNoFiles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState<{name: string, justification: string} | null>(null);

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setCreatedProjectId(null);
      setUploadedFiles([]);
      setShowSuccess(false);
      setShowConfirmNoFiles(false);
      setShowFormatError(false);
      setPendingSuggestion(null);

      if (projectToEdit) {
        getProjectFiles(projectToEdit.id)
          .then((files) => {
            const mapped: UploadedFile[] = files.map((f) => ({
              id: `existing-${f.id}`,
              backendId: f.id,
              file: new File([], f.original_name),
              name: f.original_name,
              size: 0,
              mimeType: f.type === "pdf" ? "application/pdf" : "image/jpeg",
              status: "success" as const,
              progress: 100,
            }));
            setUploadedFiles(mapped);
          })
          .catch(console.error);
      }
    }
  }, [isOpen, projectToEdit]);

  // ── Step 1 handler ─────────────────────────────────────────────────────────
  const handleStep1Submit = async (data: {
    title: string;
    description: string;
    projectUrl: string;
    categoryId: number | "";
    selectedSkills: Skill[];
  }) => {
    try {
      setIsSaving(true);
      const payload = {
        title: data.title,
        description: data.description,
        project_url: data.projectUrl,
        category_id: data.categoryId === "" ? null : data.categoryId,
        skill_ids: data.selectedSkills.map((s) => s.id),
      };

      let projectId: number;
      if (projectToEdit) {
        await updateProject(projectToEdit.id, payload);
        projectId = projectToEdit.id;
      } else {
        const created = await createProject(payload);
        projectId = created.id;
      }

      if (pendingSuggestion) {
        try {
          await suggestCategory(projectId, pendingSuggestion);
          setPendingSuggestion(null); // Clear after success
        } catch (err: any) {
          console.error("Error sending category suggestion:", err);
          alert("El proyecto se guardó, pero la sugerencia de categoría falló: " + (err.message || "Error desconocido"));
        }
      }

      setCreatedProjectId(projectId);
      setCurrentStep(2);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error al guardar la información del proyecto.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Success modal close handler ────────────────────────────────────────────
  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Modal isOpen={isOpen && !showSuccess} onClose={onClose} title={projectToEdit ? "Editar proyecto" : "Nuevo proyecto"}>
        <div className="flex flex-col gap-5">
          {currentStep === 1 && (
            <Step1Form
              projectToEdit={projectToEdit}
              onSubmit={handleStep1Submit}
              onCancel={onClose}
              onDelete={onDelete}
              isSaving={isSaving}
              onSuggestCategory={(name, justification) => setPendingSuggestion({name, justification})}
            />
          )}

          {currentStep === 2 && createdProjectId !== null && (
            <Step2Files
              projectId={createdProjectId}
              uploadedFiles={uploadedFiles}
              onFilesChange={setUploadedFiles}
              onBack={() => setCurrentStep(1)}
              onSave={() => setShowSuccess(true)}
              showFormatError={showFormatError}
              onShowFormatError={() => setShowFormatError(true)}
              onFormatErrorClose={() => setShowFormatError(false)}
              showConfirmNoFiles={showConfirmNoFiles}
              onConfirmNoFilesConfirm={() => {
                setShowConfirmNoFiles(false);
                setShowSuccess(true);
              }}
              onConfirmNoFilesCancel={() => setShowConfirmNoFiles(false)}
            />
          )}
        </div>
      </Modal>

      <SuccessModal isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};

export default CreateProjectModal;
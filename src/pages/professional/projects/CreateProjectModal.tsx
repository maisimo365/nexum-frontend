import { useState, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import Step1Form from "./Step1Form";
import Step2Files, { type UploadedFile } from "./Step2Files";
import { createProject, updateProject, type Project, type Skill } from "../../../services/project.service";
import { getProjectFiles } from "../../../services/File.service";
import Toast from "../../../components/ui/Toast";
import ConfirmCreateModal from "../../../components/ui/ConfirmCreateModal";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onDelete?: (id: number) => void;
  onSuccess?: (message: string) => void;
}

const CreateProjectModal = ({ isOpen, onClose, projectToEdit, onDelete, onSuccess }: CreateProjectModalProps) => {
  const [step, setStep] = useState(1);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  // Form data for step 1, temporarily saved for the confirmation modal
  const [pendingStep1Data, setPendingStep1Data] = useState<{ title: string; description: string; projectUrl: string; categoryId: number | ""; selectedSkills: Skill[] } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // File states for step 2
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showFormatError, setShowFormatError] = useState(false);
  const [showConfirmNoFiles, setShowConfirmNoFiles] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCreatedProject(null);
      if (projectToEdit) {
        setCurrentProjectId(projectToEdit.id);

        // Fetch existing files
        getProjectFiles(projectToEdit.id).then(files => {
          const mapped: UploadedFile[] = files.map(f => ({
            id: `server-${f.id}`,
            backendId: f.id,
            file: null as any,
            name: f.original_name,
            size: 0,
            mimeType: f.type === 'pdf' ? 'application/pdf' : 'image/jpeg',
            status: 'success' as const,
            progress: 100,
            url: f.url
          }));
          setUploadedFiles(mapped);
        }).catch(err => {
          console.error("Error cargando archivos del proyecto:", err);
          setUploadedFiles([]);
        });
      } else {
        setCurrentProjectId(null);
        setUploadedFiles([]);
      }
    }
  }, [isOpen, projectToEdit]);

  const activeProject = projectToEdit || createdProject;

  const handleStep1Submit = async (data: { title: string; description: string; projectUrl: string; categoryId: number | ""; selectedSkills: Skill[] }) => {
    if (activeProject) {
      await handleActualSubmit(data);
    } else {
      setPendingStep1Data(data);
      setShowConfirmModal(true);
    }
  };

  const handleActualSubmit = async (dataOverride?: { title: string; description: string; projectUrl: string; categoryId: number | ""; selectedSkills: Skill[] }) => {
    const data = dataOverride || pendingStep1Data;
    if (!data) return;

    setShowConfirmModal(false);
    try {
      setIsSaving(true);
      const payload = {
        title: data.title,
        description: data.description,
        project_url: data.projectUrl,
        category_id: data.categoryId === "" ? null : data.categoryId,
        skill_ids: data.selectedSkills.map(s => s.id),
      };

      if (activeProject) {
        // We are updating an existing project (either from edit, or one we just created but went back to step 1)
        await updateProject(activeProject.id, payload);
        setCurrentProjectId(activeProject.id);
        showToast("Proyecto actualizado. Ahora puedes adjuntar archivos.", "success");
      } else {
        // Creating a new one
        const res = await createProject(payload);
        setCurrentProjectId(res.id);
        setCreatedProject(res); // Store it so if we go back we edit it instead of creating duplicates
        showToast("Proyecto creado con éxito. Ahora sube tus evidencias.", "success");
      }
      setStep(2);
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "Error al guardar el proyecto.", "error");
    } finally {
      setIsSaving(false);
      setPendingStep1Data(null);
    }
  };

  const handleStep2Save = () => {
    showToast("¡Proyecto guardado completamente!", "success");
    if (onSuccess) {
      onSuccess(projectToEdit ? 'Proyecto actualizado con éxito.' : 'Proyecto creado con éxito.');
    }
    // Esperamos un momento para que el usuario lea el mensaje de éxito antes de cerrar
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleStep2Back = () => {
    setStep(1);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={activeProject ? "Editar proyecto" : "Nuevo proyecto"}>
        {step === 1 ? (
          <Step1Form
            projectToEdit={activeProject}
            onSubmit={handleStep1Submit}
            onCancel={onClose}
            onDelete={onDelete}
            isSaving={isSaving}
          />
        ) : (
          <Step2Files
            projectId={currentProjectId!}
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            onBack={handleStep2Back}
            onSave={handleStep2Save}
            showFormatError={showFormatError}
            onShowFormatError={() => setShowFormatError(true)}
            onFormatErrorClose={() => setShowFormatError(false)}
            showConfirmNoFiles={showConfirmNoFiles}
            onConfirmNoFilesConfirm={() => {
              setShowConfirmNoFiles(false);
              handleStep2Save();
            }}
            onConfirmNoFilesCancel={() => setShowConfirmNoFiles(false)}
            onToast={showToast}
          />
        )}
      </Modal>

      {!activeProject && (
        <ConfirmCreateModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => handleActualSubmit()}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default CreateProjectModal;

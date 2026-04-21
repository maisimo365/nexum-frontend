const CreateProjectModal = ({ isOpen, onClose, projectToEdit, onDelete }: CreateProjectModalProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showFormatError, setShowFormatError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmNoFiles, setShowConfirmNoFiles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setCreatedProjectId(null);
      setUploadedFiles([]);
      setShowSuccess(false);
      setShowConfirmNoFiles(false);
      setShowFormatError(false);

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
              status: "success",
              progress: 100,
            }));
            setUploadedFiles(mapped);
          })
          .catch(console.error);
      }
    }
  }, [isOpen, projectToEdit]);

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

      setCreatedProjectId(projectId);
      setCurrentStep(2);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error al guardar la información del proyecto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showSuccess}
        onClose={onClose}
        title={projectToEdit ? "Editar proyecto" : "Nuevo proyecto"}
      >
        <div className="flex flex-col gap-5">
          {currentStep === 1 && (
            <Step1Form
              projectToEdit={projectToEdit}
              onSubmit={handleStep1Submit}
              onCancel={onClose}
              onDelete={onDelete}
              isSaving={isSaving}
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
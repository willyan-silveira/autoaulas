import { useState, useEffect } from "react";
 
import { z } from "zod";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Car, Bike, Crown, Star, Upload, X } from "lucide-react";
 

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  user_type: z.enum(["aluno", "instrutor"]),
  age: z.number().min(18, "Idade mínima é 18 anos").max(100).optional().nullable(),
  summary: z.string().max(500).optional().nullable(),
  photo: z.string().optional().nullable(),
  state: z.string().max(50).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  neighborhood: z.string().max(100).optional().nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<("carro" | "moto")[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

 

  const userType = watch("user_type");

  useEffect(() => {
    checkAuth();
  }, []);

 /* const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    } 

    setUserId(session.user.id);
    await loadProfile(session.user.id);
  };

  const loadProfile = async (id: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (profile) {
        setValue("name", profile.name);
        setValue("user_type", profile.user_type);
        setValue("age", profile.age);
        setValue("summary", profile.summary);
        setValue("photo", profile.photo || "");
        setValue("state", profile.state);
        setValue("city", profile.city);
        setValue("neighborhood", profile.neighborhood);
        setIsPremium(profile.is_premium || false);
        setPhotoPreview(profile.photo || null);

        // Load specialties if instructor
        if (profile.user_type === "instrutor") {
          const { data: specs } = await supabase
            .from("instructor_specialties")
            .select("specialty")
            .eq("instructor_id", id);

          if (specs) {
            setSpecialties(specs.map(s => s.specialty));
          }
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }; 

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }

      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue("photo", "");
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile || !userId) return null;

    setUploading(true);
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, photoFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da foto",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!userId) return;

    setSaving(true);
    try {
      let photoUrl = data.photo;

      // Upload new photo if selected
      if (photoFile) {
        const uploadedUrl = await uploadPhoto();
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      // Update profile (excluding sensitive fields like is_premium, is_verified)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          user_type: data.user_type,
          age: data.age,
          summary: data.summary,
          photo: photoUrl || null,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
        })
        .eq("id", userId); 

      if (profileError) throw profileError;

      // Update specialties if instructor
      if (data.user_type === "instrutor") {
        // Delete existing specialties
        await supabase
          .from("instructor_specialties")
          .delete()
          .eq("instructor_id", userId);

        // Insert new specialties
        if (specialties.length > 0) {
          const { error: specError } = await supabase
            .from("instructor_specialties")
            .insert(
              specialties.map(s => ({
                instructor_id: userId,
                specialty: s,
              }))
            );

          if (specError) throw specError;
        }
      } else {
        // If changed from instructor to student, delete all specialties
        await supabase
          .from("instructor_specialties")
          .delete()
          .eq("instructor_id", userId);
      }

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar perfil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleSpecialty = (specialty: "carro" | "moto") => {
    setSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  } */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-xl border-2 border-blue-100 dark:border-gray-700">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Star className="h-8 w-8" />
              Meu Perfil
            </CardTitle>
            <CardDescription className="text-blue-50">
              Configure suas informações e preferências
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Tipo de usuário */}
              <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border-2 border-blue-200 dark:border-gray-700">
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">Tipo de Conta *</Label>
                <RadioGroup
                  value={watch("user_type")}
                  onValueChange={(value) => setValue("user_type", value as "aluno" | "instrutor")}
                >
                  <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <RadioGroupItem value="aluno" id="aluno" className="border-blue-500" />
                    <Label htmlFor="aluno" className="font-normal cursor-pointer text-gray-700 dark:text-gray-300">
                      Aluno
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <RadioGroupItem value="instrutor" id="instrutor" className="border-orange-500" />
                    <Label htmlFor="instrutor" className="font-normal cursor-pointer text-gray-700 dark:text-gray-300">
                      Instrutor
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Campos adicionais para instrutor */}
              {userType === "instrutor" && (
                <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-lg border-2 border-orange-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-4">
                    <Car className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Informações do Instrutor</h3>
                  </div>
                  
                  {/* Premium Status - Read Only */}
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
                    <div className="flex items-center gap-3">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <div>
                        <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                          Status da Conta Premium
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {isPremium 
                            ? "Sua conta premium está ativa! Você tem prioridade nos resultados de busca." 
                            : "Entre em contato com o suporte para ativar a conta premium e ter destaque nas buscas."}
                        </p>
                      </div>
                      {isPremium && <Star className="h-5 w-5 text-yellow-500 ml-auto" />}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade *</Label>
                    <Input
                      id="age"
                      type="number"
                      {...register("age", { valueAsNumber: true })}
                      placeholder="Sua idade"
                    />
                    {errors.age && (
                      <p className="text-sm text-red-500">{errors.age.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Resumo / Apresentação</Label>
                    <Textarea
                      id="summary"
                      {...register("summary")}
                      placeholder="Conte um pouco sobre você e sua experiência..."
                      rows={4}
                    />
                    {errors.summary && (
                      <p className="text-sm text-red-500">{errors.summary.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Foto de Perfil</Label>
                    <div className="flex flex-col gap-3">
                      {photoPreview && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-blue-200 dark:border-blue-700">
                          <img 
                            src={photoPreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handlePhotoChange}
                          className="cursor-pointer"
                        />
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Formatos aceitos: JPG, PNG, WEBP (máx. 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 dark:text-white">Especialidades *</Label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                        <Checkbox
                          id="carro"
                          checked={specialties.includes("carro")}
                          onCheckedChange={() => toggleSpecialty("carro")}
                          className="border-blue-500"
                        />
                        <Label htmlFor="carro" className="font-normal cursor-pointer flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Car className="h-5 w-5 text-blue-500" />
                          Carro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-md hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                        <Checkbox
                          id="moto"
                          checked={specialties.includes("moto")}
                          onCheckedChange={() => toggleSpecialty("moto")}
                          className="border-orange-500"
                        />
                        <Label htmlFor="moto" className="font-normal cursor-pointer flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Bike className="h-5 w-5 text-orange-500" />
                          Moto
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        {...register("state")}
                        placeholder="Ex: SP"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      {...register("neighborhood")}
                      placeholder="Ex: Vila Mariana"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

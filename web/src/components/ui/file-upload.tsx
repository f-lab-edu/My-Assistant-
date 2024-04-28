import { checkImage, readAsBase64 } from '@/lib/img-utils';
import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type FileUploadType = {
  field: ControllerRenderProps<
    {
      username: string;
      email: string;
      password: string;
      profileImage: string;
      isTestUser: boolean;
    },
    'profileImage'
  >;
};

export function FileUpload({ field }: FileUploadType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(
    'https://placehold.co/330x220?text=Profile+Image',
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      const isValid = checkImage(file, 'image');
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
        if (typeof dataImage === 'string') {
          setProfileImage(dataImage);
          field.onChange(dataImage); // Update react-hook-form with the base64 image data
        }
      }
      setShowImageSelect(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowImageSelect(true)}
      onMouseLeave={() => setShowImageSelect(false)}
      className="relative mb-5 mt-2 w-full cursor-pointer"
    >
      {profileImage && (
        <img
          id="profilePicture"
          src={profileImage}
          alt="Profile Picture"
          className="left-0 top-0 h-20 w-20 rounded-full bg-white object-cover"
        />
      )}
      {showImageSelect && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"
        >
          <Camera className="flex self-center" />
        </div>
      )}
      <input
        name="image"
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
      />
    </div>
  );
}

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Country, CreateEditDialogType } from '@/app/types';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createCountry, editCountry, getCountries } from '@/app/service/countries';
import { defaultCountryForm } from '@/app/constants';

interface CreateEditDialogProps {
  dialog: CreateEditDialogType;
  setDialog: Dispatch<SetStateAction<CreateEditDialogType>>;
  setCountries: Dispatch<SetStateAction<Country[]>>;
}

const CreateEditDialog = ({
  dialog: { isOpen, type, country },
  setDialog,
  setCountries
}: CreateEditDialogProps) => {
  const {handleSubmit, reset, register} = useForm<Country>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'edit' && country) {
        reset(country)
    }
  }, [country, type])

  const handleClose = () => {
    reset(defaultCountryForm)
    setDialog({ isOpen: false, type: 'create' });
  };

  const onSubmit = async(data: Country) => {
    setLoading(true)
    if(type === "create"){
       await createCountry(data)
    } else {
       await editCountry(data)
    }
    
    const updatedCountries = await getCountries();
    setCountries(updatedCountries.reverse());
    handleClose();
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'edit' ? 'Edit Country' : 'Create Country'}
          </DialogTitle>
          <DialogDescription>
            {type === 'edit'
              ? `You are editing ${country?.name}`
              : 'Fill the form to create a new country.'}
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="name" id="name" placeholder="Name" {...register('name')}/>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="capital">Capital</Label>
                <Input type="capital" id="capital" placeholder="Capital" {...register('capital')}/>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="count">City count</Label>
                <Input type="count" id="count" placeholder="City count" {...register('cityCount')}/>
            </div>
            <Button type='submit' disabled={loading}>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDialog;

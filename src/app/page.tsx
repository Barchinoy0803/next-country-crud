"use client";
import { useState, useEffect } from "react";
import { deleteCountry, getCountries } from "./service/countries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Country, CreateEditDialogType } from "./types";
import { Button } from "@/components/ui/button";
import CreateEditDialog from "./components/CreateEditDialog";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialog, setDialog] = useState<CreateEditDialogType>({isOpen: false, type: 'create'})
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data.reverse());
    };
    fetchData();
  }, []);

  const handleDeleteCountry = async (id: string) => {
    setDeletingId(id)
    await deleteCountry(id)
    const data = await getCountries()
    setCountries(data.reverse())
    setDeletingId(null)
  }

  const handleCreateCountry = () => {
    setDialog({isOpen: true, type: 'create'})
  }

  const handleEditCountry = (country: Country) => {
    setDialog({isOpen: true, type: 'edit', country})
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="container mx-auto">
      <h1 className="font-semibold text-[25px] my-[10px]">Countries</h1>
      <Button className="mb-[10px]" onClick={handleCreateCountry}>Create</Button>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Capital</TableHead>
              <TableHead>City count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCountries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No countries found.
                </TableCell>
              </TableRow>
            ) : (
              currentCountries.map((country: Country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">{country.name}</TableCell>
                  <TableCell>{country.capital}</TableCell>
                  <TableCell>{country.cityCount}</TableCell>
                  <TableCell className="flex gap-[15px] justify-end">
                    <Button className="cursor-pointer" onClick={() => handleEditCountry(country)}>Edit</Button>
                    <Button className="cursor-pointer" disabled={deletingId === country.id} onClick={() => handleDeleteCountry(country.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between mt-[10px]">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-[15px]">
          <Button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
      <CreateEditDialog dialog={dialog} setDialog={setDialog} setCountries={setCountries} />
    </div>
  );
}

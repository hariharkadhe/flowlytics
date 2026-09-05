"use client";
import { useState, useEffect } from "react";
import { getPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from "@/lib/api";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminPricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      currency: "USD",
      billingCycle: "monthly",
      features: [{ value: "" }],
      highlighted: false,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await getPricingPlans();
      if (res.success) setPlans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (plan?: any) => {
    if (plan) {
      setEditingPlan(plan);
      reset({
        name: plan.name,
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle,
        features: plan.features.map((f: string) => ({ value: f })),
        highlighted: plan.highlighted,
      });
    } else {
      setEditingPlan(null);
      reset({
        name: "",
        price: 0,
        currency: "USD",
        billingCycle: "monthly",
        features: [{ value: "" }],
        highlighted: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      features: data.features.map((f: any) => f.value).filter((f: string) => f.trim() !== ""),
    };
    try {
      if (editingPlan) {
        await updatePricingPlan(editingPlan._id, formattedData);
      } else {
        await createPricingPlan(formattedData);
      }
      closeModal();
      fetchPlans();
    } catch (err) {
      console.error(err);
      alert("Error saving pricing plan");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePricingPlan(id);
        fetchPlans();
      } catch (err) {
        console.error(err);
        alert("Error deleting plan");
      }
    }
  };

  if (loading) return <div className="p-8">Loading pricing plans...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pricing Plans</h1>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} /> Create Plan
        </button>
      </div>

      <div className="bg-white dark:bg-[#13141C] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100">
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Price</th>
              <th className="p-4 font-medium text-gray-600">Cycle</th>
              <th className="p-4 font-medium text-gray-600">Highlighted</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id} className="border-b border-gray-50 hover:bg-gray-50 dark:bg-slate-800/50">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{plan.name}</td>
                <td className="p-4 text-gray-600">{plan.currency} {plan.price}</td>
                <td className="p-4 text-gray-600 capitalize">{plan.billingCycle}</td>
                <td className="p-4 text-gray-600">
                  {plan.highlighted ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Yes</span>
                  ) : "No"}
                </td>
                <td className="p-4 flex items-center gap-3">
                  <button onClick={() => openModal(plan)} className="text-gray-500 dark:text-slate-400 hover:text-blue-600 transition"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(plan._id)} className="text-gray-500 dark:text-slate-400 hover:text-red-600 transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-slate-400">No pricing plans available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#13141C] rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingPlan ? "Edit Plan" : "Create Plan"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="pricing-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input {...register("name")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="number" {...register("price")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required min="0" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input {...register("currency")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                    <select {...register("billingCycle")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mb-2">
                      <input {...register(`features.${index}.value` as const)} className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Feature description" />
                      <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => append({ value: "" })} className="text-blue-600 text-sm font-medium hover:underline mt-1">+ Add Feature</button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="highlighted" {...register("highlighted")} className="w-4 h-4 rounded text-blue-600" />
                  <label htmlFor="highlighted" className="text-sm text-gray-700 font-medium">Highlight this plan</label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t bg-gray-50 dark:bg-slate-800/50 flex justify-end gap-3 rounded-b-xl">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium">Cancel</button>
              <button type="submit" form="pricing-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Save Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lapangan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminLapanganController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Lapangan::query();
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        return response()->json(['data' => $query->orderBy('nama')->paginate(20)]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request);
        $lapangan = Lapangan::create($data);
        return response()->json(['message' => 'Lapangan dibuat', 'data' => $lapangan], 201);
    }

    public function show(Lapangan $lapangan): JsonResponse
    {
        return response()->json(['data' => $lapangan]);
    }

    public function update(Request $request, Lapangan $lapangan): JsonResponse
    {
        $data = $this->validated($request, updating: true);
        $lapangan->update($data);
        return response()->json(['message' => 'Lapangan diupdate', 'data' => $lapangan]);
    }

    public function destroy(Lapangan $lapangan): JsonResponse
    {
        $lapangan->delete();
        return response()->json(['message' => 'Lapangan dihapus']);
    }

    public function setStatus(Request $request, Lapangan $lapangan): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:aktif,nonaktif,maintenance'],
        ]);
        $lapangan->update($data);
        return response()->json(['message' => 'Status diperbarui', 'data' => $lapangan]);
    }

    protected function validated(Request $request, bool $updating = false): array
    {
        $rule = $updating ? 'sometimes' : 'required';
        return $request->validate([
            'nama' => [$rule, 'string', 'max:120'],
            'jenis' => [$rule, 'in:vinyl,rumput_sintetis,interlock,semen,parquet'],
            'harga_per_jam' => [$rule, 'numeric', 'min:0'],
            'status' => ['sometimes', 'in:aktif,nonaktif,maintenance'],
            'deskripsi' => ['sometimes', 'nullable', 'string'],
            'foto' => ['sometimes', 'nullable', 'string'],
            'jam_buka' => ['sometimes', 'date_format:H:i'],
            'jam_tutup' => ['sometimes', 'date_format:H:i', 'after:jam_buka'],
        ]);
    }
}

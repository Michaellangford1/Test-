import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useReferenceItem } from '../hooks/data';
import { PageHeader } from '../components/PageHeader';
import { Photo } from '../components/Photo';
import { PhotoViewer } from '../components/PhotoViewer';
import { Markdown } from '../components/Markdown';
import { TodoText } from '../components/TodoText';
import { Confirm } from '../components/Confirm';
import { hasTodo } from '../lib/categories';
import { deleteReference } from '../db/mutations';
import { useToast } from '../ui/Toast';

export function ReferenceItemView() {
  const { id } = useParams();
  const item = useReferenceItem(id);
  const navigate = useNavigate();
  const toast = useToast();
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (item === undefined) return <p className="opacity-60">Loading…</p>;
  if (item === null) return <p className="opacity-60">That item was not found.</p>;

  return (
    <div>
      <PageHeader
        title={item.title}
        subtitle={item.category}
        back
        actions={
          <>
            <Link to={`/reference/${item.id}/edit`} className="btn-ghost min-w-touch px-2" aria-label="Edit">
              <Pencil size={22} />
            </Link>
            <button
              className="btn-ghost min-w-touch px-2 text-[#a23c46]"
              aria-label="Delete"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 size={22} />
            </button>
          </>
        }
      />

      {item.photoIds.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {item.photoIds.map((pid) => (
            <Photo
              key={pid}
              id={pid}
              thumb
              className="h-40 w-full rounded-xl"
              onClick={() => setViewPhoto(pid)}
            />
          ))}
        </div>
      )}

      {item.body ? (
        hasTodo(item.body) ? (
          <div className="rounded-xl border border-amber/40 bg-amber-soft/40 p-4 dark:bg-amber-deep/20">
            <p className="whitespace-pre-wrap leading-relaxed">
              <TodoText text={item.body} />
            </p>
          </div>
        ) : (
          <Markdown>{item.body}</Markdown>
        )
      ) : (
        <p className="opacity-60">No notes yet — tap edit to add some.</p>
      )}

      {item.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="chip border-line dark:border-slate-600">
              #{t}
            </span>
          ))}
        </div>
      )}

      {viewPhoto && <PhotoViewer id={viewPhoto} onClose={() => setViewPhoto(null)} />}

      <Confirm
        open={confirmDelete}
        title="Delete this reference item?"
        body="This removes the item and its photos from this device."
        confirmLabel="Delete"
        danger
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteReference(item.id);
          toast.show('Item deleted', 'success');
          navigate('/reference');
        }}
      />
    </div>
  );
}

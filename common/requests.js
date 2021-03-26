export async function onGenerateToken(state, setState) {
  const response = await fetch("/api/token/generate");
  const json = await response.json();

  setState({ ...state, token: json.token, loading: false });
}

export async function onCreateBucket(state, setState) {
  const prompt = window.prompt("What do you want to name your bucket?");
  if (!prompt) {
    return;
  }

  const response = await fetch("/api/buckets/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bucketName: prompt, key: state.key }),
  });

  return await onListBuckets(state, setState);
}

export async function onListBuckets(state, setState) {
  const response = await fetch("/api/buckets/list", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: state.key }),
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return { error: json.error };
  }

  return setState({ ...state, buckets: json.buckets, loading: false });
}

export async function onDeleteBucket(state, setState, options) {
  const confirm = window.confirm(
    "Are you sure you want to delete this bucket? This action is irreversible"
  );
  if (!confirm) {
    return;
  }

  const response = await fetch("/api/buckets/delete", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketName: options.bucketName,
      bucketKey: options.bucketKey,
      key: state.key,
    }),
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return { error: json.error };
  }

  return await onListBuckets(state, setState);
}

export async function onAddFile(state, setState, options) {
  alert("coming soon");
}

export async function onMakeStorageDeal(state, setState, options) {
  alert("coming soon");
}

export async function onDeleteFile(state, setState) {
  alert("coming soon");
}
